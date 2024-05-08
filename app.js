const { createRoot } = ReactDOM;

const App = () => {
  const { useState } = React;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [responseHeaders, setResponseHeaders] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://chimpu.xyz/api/post.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phonenumber: phoneNumber }),
      });
      const headers = {};
      for (const [key, value] of response.headers.entries()) {
        headers[key] = value;
      }
      setResponseHeaders(headers);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber) {
      await fetchData();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-600">
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center mb-4"
        >
          <input
            className="border border-gray-300 rounded-l-md px-4 py-2"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
          >
            Submit
          </button>
        </form>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2 text-center text-white">
              Response Headers
            </h2>
            <pre className="bg-gray-100 p-4 rounded-md">
              {Object.keys(responseHeaders).map(
                (key) => `${key}: ${responseHeaders[key]}\n`
              )}
            </pre>
          </>
        )}
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
