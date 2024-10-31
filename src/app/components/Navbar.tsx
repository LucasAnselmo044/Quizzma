import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface NavbarProps {
  user?: {
    image?: string;
    name?: string;
    email?: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/signin');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-800 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link href="/dashboard">
          <div className="flex items-center gap-3 cursor-pointer">
            <Image src="/images/logo.png" alt="Quizzma logo" width={120} height={32} />
          </div>
        </Link>

        {/* Ícone de Hambúrguer para Mobile */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M3 5h18a1 1 0 010 2H3a1 1 0 010-2zm0 6h18a1 1 0 010 2H3a1 1 0 010-2zm0 6h18a1 1 0 010 2H3a1 1 0 010-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Links de Navegação (ocultos em dispositivos móveis) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Link href="/profile">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="rounded-full border border-white"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-400 rounded-full" />
              )}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Menu de Hambúrguer (exibido apenas em dispositivos móveis) */}
      {isMenuOpen && (
        <div className="flex flex-col md:hidden mt-4 space-y-4 bg-blue-700 rounded-lg py-4 px-6 shadow-md">
          <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
            <div className="flex items-center gap-3">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="rounded-full border border-white"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-400 rounded-full" />
              )}
              <span className="text-lg">{user?.name || 'Usuário'}</span>
            </div>
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
