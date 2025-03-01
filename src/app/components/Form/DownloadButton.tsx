interface DownloadButtonProps {
  fileUrl: string;
  fileName: string;
}

const DownloadButton = ({ fileUrl, fileName, children }: React.PropsWithChildren<DownloadButtonProps>) => {
  return (
    <a
      href={fileUrl}
      download={fileName}
      className="
        group relative inline-flex items-center justify-center
        px-6 py-3 overflow-hidden font-medium transition-all
        bg-white rounded-xl hover:bg-blue-50
        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        border-[1px] border-gray-200
        hover:border-blue-300
        transform hover:-translate-y-0.5
        transition duration-300 ease-in-out
      "
    >
      <span className="relative flex items-center space-x-2">
        {/* Download Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>

        {/* Text */}
        <span className="text-gray-700 group-hover:text-blue-800 transition-colors font-medium">
          {children}
        </span>
      </span>
    </a>
  );
};

export default DownloadButton;
