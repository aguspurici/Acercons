import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch {
      setError("Email o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111] border border-neutral-800 p-8 space-y-6">
        <div className="space-y-1 text-left">
          <span className="text-[10px] font-mono font-bold text-[#F27D26] uppercase tracking-widest">
            Panel Administrativo
          </span>
          <h1 className="text-2xl font-black uppercase text-white tracking-tight">
            Ingresá al Panel de Control
          </h1>
          <p className="text-xs text-neutral-500">
            Ingresá tus credenciales para continuar.
          </p>
       
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 text-white px-4 py-3 text-sm rounded-none focus:border-[#F27D26] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 text-white px-4 py-3 text-sm rounded-none focus:border-[#F27D26] focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#F27D26] text-black font-black text-xs uppercase tracking-widest hover:bg-orange-500 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
           <Link
          to="/"
          className="text-[15px] text-neutral-500 hover:text-[#F27D26] transition-colors duration-200 flex items-center gap-1 mt-1"
        >
          ← Volver al sitio
        </Link>
        </form>
      </div>
    </div>
  );
};