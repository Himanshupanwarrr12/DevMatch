  const Chat =() => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-white rounded-2xl p-4 shadow">
        <div className="mb-3 text-left">
          <div className="inline-block bg-gray-200 text-gray-800 p-2 rounded-2xl max-w-xs">
            Hello! How can I help you?
          </div>
        </div>

        <div className="mb-3 text-right">
          <div className="inline-block bg-blue-500 text-white p-2 rounded-2xl max-w-xs">
            Hi! I need help.
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-3 border border-gray-300 rounded-2xl focus:outline-none"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-2xl shadow">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat