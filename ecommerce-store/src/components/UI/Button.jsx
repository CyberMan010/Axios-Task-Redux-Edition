function CustomButton({ children, onClick, className }) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        {children}
      </button>
    );
  }
  
  export default CustomButton;