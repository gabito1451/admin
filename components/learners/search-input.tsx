import Image from 'next/image';

interface Props {
  onChange: (text: string) => void;
}

export default function SearchInput({ onChange }: Props) {
  return (
    <div className="relative rounded-md w-64 flex items-center justify-between transition">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={16}
          height={16}
          className="text-gray-400"
        />
      </div>

      {/* Input field */}
      <input
        type="text"
        placeholder="Search learner"
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none text-sm transition"
      />
    </div>
  );
}
