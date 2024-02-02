import React, {useEffect, useState} from 'react';
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Label,
	Textarea,
} from '@/components/ui';
import {ArrowLeftIcon, PlusIcon, TrashIcon} from '@radix-ui/react-icons';
import {FilePond} from 'react-filepond';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
interface ISection {
	id: number;
	name: string;
	label: string;
	description: string;
	active: boolean;
}

export const AddSection = () => {
	const [sections, setSections] = useState<ISection[]>([
		{
			id: 1,
			name: '',
			description: '',
			label: 'Section 1',
			active: true,
		},
	]);

	const form = useForm<ISection>({
		defaultValues: {
			name: '',
			description: '',
		},
	});

	const {control, reset, handleSubmit, getValues} = form;

	// This function now updates the current section with form values before switching
	const switchToSection = (id: number) => {
		const formValues = getValues();

		// Update the sections state with current form values for the active section
		setSections((sections) =>
			sections.map((section) => {
				if (section.active) {
					return {...section, ...formValues, active: false};
				} else if (section.id === id) {
					return {...section, active: true};
				}
				return section;
			})
		);

		// After state update, reset the form with the values of the new active section
		const newActiveSection = sections.find((section) => section.id === id);
		if (newActiveSection) {
			reset(newActiveSection);
		}
	};

	// Adjusted handleAddSection to ensure correct state management
	const handleAddSection = () => {
		const newSectionId = Math.max(0, ...sections.map((s) => s.id)) + 1;
		const newSection: ISection = {
			id: newSectionId,
			name: '',
			description: '',
			label: `Section ${newSectionId}`,
			active: false, // Initially set to false to avoid multiple active sections
		};

		// Capture current form values and update the current active section before adding a new section
		const currentFormValues = getValues();
		const updatedSections = sections.map((section) => {
			if (section.active) {
				return {...section, ...currentFormValues, active: false};
			}
			return section;
		});

		setSections([...updatedSections, newSection]);
		switchToSection(newSectionId); // Automatically switch to the new section
	};

	// Ensure the form is reset with the first section's values on initial render
	useEffect(() => {
		if (sections.length > 0) {
			const activeSection = sections.find((section) => section.active);
			if (activeSection) {
				reset(activeSection);
			}
		}
	}, [sections, reset]);

	const handleRemoveSection = () => {
		if (sections.length > 1) {
			const activeSectionIndex = sections.findIndex(
				(section) => section.active
			);
			const newSections = sections.filter(
				(_, index) => index !== activeSectionIndex
			);
			setSections(
				newSections.map((section, index) => ({
					...section,
					active: index === 0, // Activate the first section after removal
				}))
			);
		} else {
			toast.warning('Cannot remove the last section.');
		}
	};

	const handleSectionSubmit = (data: ISection) => {
		// Update the current section's data
		const updatedSections = sections.map((section) => {
			if (section.active) {
				return {...section, ...data};
			}
			return section;
		});

		// Validate all sections
		const allSectionsValid = updatedSections.every(
			(section) => section.name && section.description
		);

		if (allSectionsValid) {
			toast.success('All sections are valid.');
			console.log(updatedSections);
			// Proceed with form submission logic...
		} else {
			toast.warning('Please fill all sections.');
		}
	};
	return (
		<Form {...form}>
			<div className="w-full mx-auto flex gap-1 h-full">
				<div
					className="vertical-tabs w-1/4  
				h-full overflow-scroll no-scrollbar
				dark:bg-gray-800"
				>
					<div className="flex flex-col gap-2">
						<div className="flex justify-between items-center">
							<Button
								type="button"
								size="default"
								variant="outline"
								color="warning"
							>
								<ArrowLeftIcon />
							</Button>
							<Button
								onClick={handleAddSection}
								type="button"
								size="default"
								color="warning"
								variant="outline"
							>
								<PlusIcon />
							</Button>
						</div>
						<div className="divider w-full h-[1px] bg-gray-200 dark:bg-gray-700"></div>
						<div className="mt-4 overflow-y-auto no-scrollbar max-h-[calc(100vh-270px)]">
							<div className="flex flex-col gap-2">
								{sections.map((section, index) => (
									<Button
										onClick={() => switchToSection(section.id)}
										key={section.id}
										type="button"
										size="default"
										variant={section.active ? 'default' : 'secondary'}
									>
										{section.label}
									</Button>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="w-3/4">
					<form
						onSubmit={handleSubmit(handleSectionSubmit)}
						className="w-11/12 mx-auto flex flex-col h-full"
					>
						<div className="flex justify-between items-center">
							<Label className="text-xl">Section Info</Label>
							<Button
								onClick={handleRemoveSection}
								type="button"
								size="default"
								variant="outline"
								color="danger"
							>
								<TrashIcon />
							</Button>
						</div>
						<div className="flex flex-col mt-4 gap-4">
							<FormField
								control={form.control}
								name="name"
								rules={{
									required: 'Section name is required.',
								}}
								render={({field}) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter section name"
												type="text"
												id="name"
												color="warning"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="description"
								rules={{
									required: 'Description is required.',
								}}
								render={({field, fieldState}) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												placeholder="Section description"
												id="description"
												color="warning"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Label>Section Recources</Label>
							<FilePond
								name="recources"
								acceptedFileTypes={['image/*']}
								oninit={() => {}}
								labelFileProcessingError={'Error processing file.'}
								allowProcess={true}
								allowMultiple={true}
								// onupdatefiles={setAvatar}
								// labelIdle='<span class="filepond--label-action"><svg xmlns="http://www.w3.org/2000/svg" height="32" width="30" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg></span>'
								stylePanelLayout="compact"
								allowDrop={false}
								allowPaste={false}
								credits={false}
							/>
						</div>
						<div className="w-full flex justify-between items-end mb-12 h-full self-end">
							<Button type="button" size="lg" className="">
								Save
							</Button>
							<Button type="submit" size="lg" className="">
								Next
							</Button>
						</div>
					</form>
				</div>
			</div>
		</Form>
	);
};
