const OGImageContent = () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/og/my-notion-face-transparent.png`;

  return (
    <div className="aurora-bg flex flex-row gap-1 p-4 rounded-lg border justify-evenly">
      {/* Left: Avatar */}
      <img src={url} alt="Avatar" className="object-cover w-40 h-40 " />

      {/* Right: Text */}
      <div className="flex flex-col justify-center  ">
        <h1 className="text-2xl text-gray-800 font-semibold">
          CSS Flex 기본 알기
        </h1>
        <div className="flex flex-row items-center gap-4 mt-6">
          <span className="text-lg  text-gray-900 rounded-lg ">by YUN</span>
        </div>
      </div>
    </div>
  );
};

export default OGImageContent;
