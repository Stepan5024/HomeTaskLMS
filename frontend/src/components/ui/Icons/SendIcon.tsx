"use client";

import React from "react";

interface SendIconProps extends React.SVGProps<SVGSVGElement> {
	size?: number | string;
	disabled?: boolean;
}

const SendIcon: React.FC<SendIconProps> = ({
	size = 24,
	disabled = false,
	...rest
}) => {
	if (rest?.onClick) {
		return (
			<button type="button" disabled={disabled}>
				<svg
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					{...rest}
				>
					<path
						d="M18.723 12.8385L4.7655 18.723C4.46417 18.8435 4.17792 18.8176 3.90675 18.6452C3.63558 18.4727 3.5 18.2224 3.5 17.8942V6.10575C3.5 5.77758 3.63558 5.52725 3.90675 5.35475C4.17792 5.18242 4.46417 5.1565 4.7655 5.277L18.723 11.1615C19.0948 11.3257 19.2807 11.6052 19.2807 12C19.2807 12.3948 19.0948 12.6743 18.723 12.8385ZM5 17L16.85 12L5 7V10.6922L10.423 12L5 13.3077V17Z"
						fill="inherit"
					/>
				</svg>
			</button>
		);
	}

	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
		>
			<path
				d="M18.723 12.8385L4.7655 18.723C4.46417 18.8435 4.17792 18.8176 3.90675 18.6452C3.63558 18.4727 3.5 18.2224 3.5 17.8942V6.10575C3.5 5.77758 3.63558 5.52725 3.90675 5.35475C4.17792 5.18242 4.46417 5.1565 4.7655 5.277L18.723 11.1615C19.0948 11.3257 19.2807 11.6052 19.2807 12C19.2807 12.3948 19.0948 12.6743 18.723 12.8385ZM5 17L16.85 12L5 7V10.6922L10.423 12L5 13.3077V17Z"
				fill="inherit"
			/>
		</svg>
	);
};

export default SendIcon;
