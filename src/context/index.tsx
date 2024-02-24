import React, {createContext, useContext, useState} from 'react';

interface ISectionMedia {
	id: number;
	files: File[];
}

interface SectionMediaContextType {
	setMediaFiles: (file: File[], id: number) => void;
	removeMediaFile: (id: number) => void;
	getSectionFiles: (id: number) => File[];
}

export const SectionMediaContext = createContext<
	SectionMediaContextType | undefined
>(undefined);

export const SectionMediaProvider: React.FC<{children: React.ReactNode}> = ({
	children,
}) => {
	const [sections, setSections] = useState<ISectionMedia[]>([]);

	const setMediaFiles = (files: File[], id: number) => {
		const existingSectionIndex = sections.findIndex(
			(section) => section.id === id
		);

		if (existingSectionIndex !== -1) {
			// If section already exists, update its files array
			const updatedSections = [...sections];
			updatedSections[existingSectionIndex] = {
				...updatedSections[existingSectionIndex],
				files: [...updatedSections[existingSectionIndex].files, ...files],
			};
			setSections(updatedSections);
		} else {
			// If section does not exist, add a new section
			setSections((prev) => [...prev, {id, files}]);
		}
	};

	const removeMediaFile = (id: number) => {
		setSections((prev) => prev.filter((section) => section.id !== id));
	};

	const getSectionFiles = (id: number) => {
		const section = sections.find((section) => section.id === id);
		return section ? section.files : [];
	};

	const contextValue: SectionMediaContextType = {
		setMediaFiles,
		removeMediaFile,
		getSectionFiles,
	};

	return (
		<SectionMediaContext.Provider value={contextValue}>
			{children}
		</SectionMediaContext.Provider>
	);
};

export const useSectionMedia = (): SectionMediaContextType => {
	const context = useContext(SectionMediaContext);
	if (!context) {
		throw new Error(
			'useSectionMedia must be used within a SectionMediaProvider'
		);
	}
	return context;
};
