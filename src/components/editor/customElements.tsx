import React, {
	ReactNode,
	AnchorHTMLAttributes,
	TableHTMLAttributes,
	ThHTMLAttributes,
	TdHTMLAttributes,
	OlHTMLAttributes,
	HTMLAttributes,
	BlockquoteHTMLAttributes,
} from 'react';
export const CustomTable = ({
	children,
	...props
}: TableHTMLAttributes<HTMLTableElement>) => (
	<div className="custom-table">
		<table {...props}>{children}</table>
	</div>
);

export const CustomLink = ({
	children,
	...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
	<a className="text-blue-700" {...props}>
		{children}
	</a>
);

export const CustomTableHeader = ({
	children,
	...props
}: ThHTMLAttributes<HTMLTableCellElement>) => (
	<th
		className="custom-table-header bg-gray-500 text-zinc-100 text-center"
		{...props}
	>
		{children}
	</th>
);

export const CustomTableRow = ({
	children,
	...props
}: HTMLAttributes<HTMLTableRowElement>) => (
	<tr className="custom-table-row" {...props}>
		{children}
	</tr>
);

export const CustomTableData = ({
	children,
	...props
}: TdHTMLAttributes<HTMLTableDataCellElement>) => (
	<td className="custom-table-data" {...props}>
		{children}
	</td>
);

export const CustomH1 = ({
	children,
	...props
}: HTMLAttributes<HTMLHeadingElement>) => (
	<h1 className="text-4xl font-bold" {...props}>
		{children}
	</h1>
);

export const CustomH2 = ({
	children,
	...props
}: HTMLAttributes<HTMLHeadingElement>) => (
	<h2 className="text-3xl font-bold" {...props}>
		{children}
	</h2>
);

export const CustomH3 = ({
	children,
	...props
}: HTMLAttributes<HTMLHeadingElement>) => (
	<h3 className="text-2xl font-bold" {...props}>
		{children}
	</h3>
);

export const CustomH4 = ({
	children,
	...props
}: HTMLAttributes<HTMLHeadingElement>) => (
	<h4 className="text-xl font-bold" {...props}>
		{children}
	</h4>
);

export const CustomH5 = ({
	children,
	...props
}: HTMLAttributes<HTMLHeadingElement>) => (
	<h5 className="text-lg font-bold" {...props}>
		{children}
	</h5>
);

export const CustomH6 = ({
	children,
	...props
}: HTMLAttributes<HTMLHeadingElement>) => (
	<h6 className="text-base font-bold" {...props}>
		{children}
	</h6>
);

export const CustomUl = ({
	children,
	...props
}: HTMLAttributes<HTMLUListElement>) => {
	const style = {
		padding: '10px 20px',
		margin: '0 0 20px 0',
	};
	return (
		<ul style={style} className="list-disc" {...props}>
			{children}
		</ul>
	);
};

export const CustomOl = ({
	children,
	...props
}: OlHTMLAttributes<HTMLOListElement>) => {
	const style = {
		padding: '0px 20px',
		margin: '0 0 20px 0',
	};
	return (
		<ol style={style} className="list-decimal" {...props}>
			{children}
		</ol>
	);
};

export const CustomBlockquote = ({
	children,
	...props
}: BlockquoteHTMLAttributes<HTMLQuoteElement>) => {
	const style = {
		padding: '10px 20px',
		margin: '0 0 20px 0',
		borderLeft: '5px solid #eee',
		color: '#666',
		fontStyle: 'italic',
	};
	return (
		<blockquote style={style} className="text-lg italic" {...props}>
			{children}
		</blockquote>
	);
};
