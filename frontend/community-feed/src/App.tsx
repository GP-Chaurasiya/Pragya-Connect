import { CommunityFeed } from './components/feed/CommunityFeed';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <main className="py-8">
        <CommunityFeed />
      </main>
    </div>
  );
}

export default App;