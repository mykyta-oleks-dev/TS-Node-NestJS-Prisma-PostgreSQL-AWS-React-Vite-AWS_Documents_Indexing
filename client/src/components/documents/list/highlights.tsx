import parse from 'html-react-parser';

const Highlights = ({ highlights }: { highlights: string[] }) => {
	const parsed = highlights.map((h) => {
		let preParsed = h.replaceAll('\n+', '<br/>');
		preParsed = `<div>${preParsed}<div/>`;

		return parse(preParsed);
	});

	return (
		<div className="rounded-md p-3 bg-gray-200 flex flex-col gap-2 highlights">
			{parsed}
		</div>
	);
};

export default Highlights;
