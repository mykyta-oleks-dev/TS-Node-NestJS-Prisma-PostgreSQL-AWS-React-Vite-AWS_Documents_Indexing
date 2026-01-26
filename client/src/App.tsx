import AuthForm from './components/auth';
import UserDocuments from './components/documents';
import { useEmailStore } from './store/email.store';

function App() {
	const email = useEmailStore((s) => s.email);

	return (
		<div className="flex h-full flex-col items-center justify-center p-5">
			{email ? <UserDocuments /> : <AuthForm />}
		</div>
	);
}

export default App;
