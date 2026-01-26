import { Button } from '@/components/ui/button';
import { useEmailStore } from '@/store/email.store';

const AuthDisplay = () => {
	const { email, setEmail } = useEmailStore();
	return (
		<div className="flex gap-3 w-full justify-between">
			<span>{email}</span>
			<Button variant="outline" onClick={() => setEmail(undefined)}>
				Logout
			</Button>
		</div>
	);
};

export default AuthDisplay;
