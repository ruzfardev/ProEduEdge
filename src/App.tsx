import {Avatar, Badge, Button} from '@nextui-org/react';
import './App.css';
function App() {
	return (
		<div className="flex w-100 h-100">
			<Badge content="5" color="danger" placement="top-left">
				<Avatar
					isBordered
					radius="md"
					src="https://i.pravatar.cc/150?u=a04258114e29026708c"
				/>
			</Badge>
			<Button color="primary" variant="shadow">
				Shadow
			</Button>
		</div>
	);
}

export default App;
