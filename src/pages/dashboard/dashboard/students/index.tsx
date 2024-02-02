import {CustomTable} from '@/components/table';
import {
	Button,
	DropdownMenu,
	DropdownMenuTrigger,
	Input,
} from '@/components/ui';
import {ChevronDownIcon} from '@radix-ui/react-icons';
import React from 'react';

export const StudentList = () => {
	return (
		<div className="dashboard-table mt-5">
			<div className="flex items-center pb-4">
				<Input
					placeholder="Filter students..."
					// value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
					// onChange={(event) =>
					// 	table.getColumn('email')?.setFilterValue(event.target.value)
					// }
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					{/* <DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent> */}
				</DropdownMenu>
			</div>
			<div className="w-full rounded-md no-scrollbar max-h-[calc(100vh-300px)] overflow-scroll border">
				<CustomTable />
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{/* {table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected. */}
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						// onClick={() => table.previousPage()}
						// disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						// onClick={() => table.nextPage()}
						// disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};
