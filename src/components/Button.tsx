interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-700 text-white font-bold text-2xl py-4 px-6 rounded-lg"
    >
      {children}
    </button>
  );
};

export default Button;
