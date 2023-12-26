import WriterUploader from '@src/components/WriterUploader'

function Writers() {
  return (
    <div>
        <div className="flex items-center justify-between bg-white p-5 rounded mb-5">
                <div className="text-left">
                    <h1 className="font-semibold text-gray-900 text-2xl">Writers Profiles</h1>
                    <p className="mt-1.5 text-sm text-gray-500">Let's upload some images and store them for later! 🎉</p>
                </div>

                <div className="flex flex-row items-center">
                    <WriterUploader />
                </div>
            </div>
    </div>
  )
}

export default Writers