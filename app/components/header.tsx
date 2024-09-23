export const Header = ({ isLoginPage }: { isLoginPage: boolean }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1>Odometer Reading Project Admin Console</h1>
      {!isLoginPage ? (
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/email-invitation">Email Invitation</a>
            </li>
            <li>
              <a href="/reading-reminder">Reading Reminder</a>
            </li>
            <li>
              <a href="/posts">Posts</a>
            </li>
            <li>
              <a href="/stats">Stats</a>
            </li>
            <li>
              <a href="/messages">Messages</a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
};
