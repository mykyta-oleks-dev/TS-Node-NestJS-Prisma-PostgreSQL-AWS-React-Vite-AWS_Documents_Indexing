import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import QueryClientProvider from './config/reactQuery/provider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider>
			<App />
		</QueryClientProvider>
	</StrictMode>,
);
