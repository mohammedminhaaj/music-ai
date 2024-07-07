const LyricNotFound: React.FC = () => {
	return (
		<>
			<h2 className='font-bold text-2xl'>Oops!</h2>
			<h3 className="font-extralight">Looks like the lyrics are missing for this track.</h3>
            <h3 className="font-extralight">Please search a different track.</h3>
		</>
	);
};

export default LyricNotFound;
