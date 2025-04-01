export default function Features() {
  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
      <NavBar />
      <h1 className="text-3xl font-bold">Features</h1>
      <ul className="mt-4 text-center">
        <li>✅ AI-Powered Email Sorting</li>
        <li>✅ Distraction-Free Inbox</li>
        <li>✅ Smart Email Highlighting</li>
      </ul>
    </div>
  );
}