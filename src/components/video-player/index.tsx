import {getBlobUrlWithSasToken} from '@/lib/utils';
import ReactPlayer from 'react-player';
import React, {FC, useEffect} from 'react';

interface IVideoPlayerProps {
	url: string | undefined;
}
export const VideoPlayer: FC<IVideoPlayerProps> = ({url}) => {
	useEffect(() => {
		console.log(url);
	}, [url]);
	return (
		<>
			<ReactPlayer
				url={getBlobUrlWithSasToken(url, 'recourses')}
				controls
				height="100%"
				width="100%"
				style={{borderRadius: '10px'}}
			/>
		</>
	);
};
