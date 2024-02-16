import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
	MeetingProvider,
	useMeeting,
	useParticipant,
} from '@videosdk.live/react-sdk';
import ReactPlayer from 'react-player';
import {Card} from '@/components/ui';
import {MeetingView} from './meeting-view';

export const MeetingProviderComponent = () => {
	return (
		<Card className="h-full">
			<MeetingProvider
				config={{
					meetingId: 'z5kh-utdh-l3lz',
					micEnabled: true,
					webcamEnabled: true,
					name: "ruzfardev's Org",
				}}
				token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmNGJkOTM1Yi05OWM0LTQ2Y2MtYWE2ZS1mMjEzOGI0NTY2MWQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwNzgxODY2NCwiZXhwIjoxNzA3OTA1MDY0fQ.CMbYLBV4cbO4IaWLZScVPzDTB2acA0qB7c1_zfTlcGE"
			>
				<MeetingView />
			</MeetingProvider>
		</Card>
	);
};
