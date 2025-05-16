// src/components/FormInput.jsx

const FormInput = ({ icon, type, placeholder, name, required = false }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kahf-green"
      />
    </div>
  );
};

export default FormInput;