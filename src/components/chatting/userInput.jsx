import { useState } from 'react';
import { RiSendPlaneFill } from "react-icons/ri";
import { BiPlusCircle, BiSolidMicrophone } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { MdTextFields } from "react-icons/md";

const UserInput = ({ onSubmit }) => {
    // 텍스트 입력 상태관리
    const [inputText, setInputText] = useState('');
    // 파일 업로드 상태관리
    const [files, setFiles] = useState([]);
    // 업로드 중인지 여부 상태관리
    const [uploading, setUploading] = useState(false);

    // 메시지 전송 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputText.trim() || files.length) {
            setUploading(true); // 업로드 시작
            await new Promise((resolve) => setTimeout(resolve, 1500)); // 업로드 시뮬레이션 (1.5초)
            onSubmit({ text: inputText, files });
            setInputText('');
            setFiles([]);
            setUploading(false); // 업로드 완료
        }
    };

    // 파일 선택 시 처리 함수
    const handleFileChange = (e) => {
        setFiles([...files, ...Array.from(e.target.files)]);
    };

    // 파일 삭제 처리 함수
    const handleRemoveFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    };

    // 마이크 클릭 시 처리 함수
    const handleMicrophoneClick = () => {
        alert("음성 입력 기능이 아직 구현되지 않았습니다.");
    };

    return (
        <div className="w-full">
            {/* 업로드된 파일 리스트 */}
            <div className="flex space-x-2 overflow-x-auto mb-3 p-2 bg-muted-light rounded-lg">
                {files.length > 0 &&
                    files.map((file, index) => (
                        <div
                            key={index}
                            className="w-1/5 min-w-[150px] flex items-center justify-between bg-background p-2 rounded-lg shadow-md"
                        >
                            <span className="truncate text-sm w-[80%]" title={file.name}>
                                {file.name}
                            </span>
                            <MdCancel
                                onClick={() => handleRemoveFile(index)}
                                className="text-primary cursor-pointer text-xl"
                            />
                        </div>
                    ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-row relative items-center">
                {/* 파일 업로드 아이콘 */}
                <label className="text-2xl mr-3 cursor-pointer flex items-center">
                    <BiPlusCircle/>
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>

                {/* 텍스트 입력 및 아이콘 */}
                <div className="relative w-full">
                    <MdTextFields
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl"
                    />
                    <textarea
                        className="bg-muted w-full h-12 pl-10 pr-20 p-3 rounded-2xl resize-none focus:ring-primary focus:outline-none flex items-center"
                        placeholder="Type your message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </div>

                {/* 마이크 아이콘 */}
                <BiSolidMicrophone
                    onClick={handleMicrophoneClick}
                    className="absolute right-20 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer"
                />

                {/* 전송 버튼 */}
                <button
                    type="submit"
                    className={`absolute right-2 top-1/2 py-1.5 px-5 transform -translate-y-1/2 bg-primary text-primary-foreground rounded-xl flex items-center ${
                        uploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={uploading}
                >
                    {uploading ? (
                        <AiOutlineLoading3Quarters className="text-xl animate-spin"/>
                    ) : (
                        <RiSendPlaneFill className="text-xl"/>
                    )}
                </button>
            </form>

        </div>
    );
};

export default UserInput;
