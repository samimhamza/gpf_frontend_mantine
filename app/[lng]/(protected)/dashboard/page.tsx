import District from "@/Components/icons/District";
import Mosque from "@/Components/icons/Mosque";
import Survey from "@/Components/icons/Survey";
import React from "react";

const Dashboard = () => {
	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{/* Card 1: Mosque Locations */}
				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="flex justify-center  items-center mb-4">
						<Mosque />
						{/* <h2 className="text-lg font-semibold text-gray-800">Mosque Locations</h2> */}
					</div>
					<p className="text-base text-gray-600 mb-4 text-center">
						مجموعه مساجد: 190
					</p>
				</div>
				{/* Card 2: Districts */}
				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="flex justify-center items-center mb-4">
						<District />
					</div>
					<p className="text-base text-gray-600 mb-4 text-center">
						مجموعه ناحیه / ولسوالی :340
					</p>
				</div>
				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="flex justify-center items-center mb-4">
						<Survey />
					</div>
					<p className="text-base text-gray-600 mb-4 text-center">
						مجموعه سروی شده :230
					</p>
					<p className="text-base text-gray-600 mb-4 text-center">
						مجموعه نیاز به سروی :10
					</p>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
