export default function About() {
  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
      <NavBar />
      <h1 className="text-3xl font-bold">About MailMind</h1>
      <p className="mt-4 max-w-xl text-center">
        MailMind is an AI-powered Gmail extension that organizes your inbox,
        reduces distractions, and highlights essential emails.
      </p>
    </div>
  );
}