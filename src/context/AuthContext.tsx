import { createContext, useContext, useEffect, useState, useRef } from "react";
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutos en ms

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      signOut(auth);
    }, INACTIVITY_LIMIT);
  };

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (firebaseUser) {
        resetTimer();
      } else {
        clearTimer();
      }
    });
    return () => unsubscribe();
  }, []);

  // Resetea el timer con cualquier actividad del usuario
  useEffect(() => {
    if (!user) return;

    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimer();
    };
  }, [user]);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    clearTimer();
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);