import { Button } from '@/components/ui/button';
import { useEmailStore } from './store/email.store';
import AuthForm from './components/auth';

function App() {
	const { email, setEmail } = useEmailStore();

	return (
		<div className="flex min-h-svh flex-col items-center justify-center p-3">
			{email ? (
				<Button onClick={() => setEmail(undefined)}>Click me</Button>
			) : (
				<AuthForm />
			)}
		</div>
	);
}

export default App;
