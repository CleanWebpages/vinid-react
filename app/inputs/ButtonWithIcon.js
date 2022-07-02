import React, { memo, useCallback } from 'react';

// eslint-disable-next-line prefer-arrow-callback
const ButtonWithIcon = memo(function ButtonWithIcon({
	name, label, icon, onClick, style = {},
}) {
	const onClickHandler = useCallback(() => onClick(name), [name]);
	return (
		<a className="btn btn-sq-lg btn-light text-dark space-left-1 space-bottom-1 shadow_6 pad-top-2" onClick={onClickHandler}>
			<span className="align-middle">
				<i className={`${icon} fa-3x`} />
				<br />
				{label}
			</span>
		</a>
	);
});
export default ButtonWithIcon;
