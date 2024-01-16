import React from 'react';
import ReactDOM from 'react-dom/client';
import {registerPlugin} from 'react-filepond';
import {RouteProvider} from './routes/root.tsx';
import {Provider} from 'react-redux';
import {store} from './redux/store.ts';

// Import FilePond styles
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import './index.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouteProvider />
		</Provider>
	</React.StrictMode>
);
