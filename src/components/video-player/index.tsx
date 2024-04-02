import {getBlobUrlWithSasToken} from '@/lib/utils';
import ReactPlayer from 'react-player';
import React, {FC} from 'react';
import {CourseContent} from '@/redux/features/student/types';

interface IVideoPlayerProps {
	selectedSection: CourseContent;
}
export const VideoPlayer: FC<IVideoPlayerProps> = ({selectedSection}) => {
	return (
		<ReactPlayer
			url={getBlobUrlWithSasToken(
				selectedSection?.resources[0].url,
				'recourses'
			)}
			controls
			height="100%"
			width="100%"
			style={{borderRadius: '10px'}}
		/>
	);
};
