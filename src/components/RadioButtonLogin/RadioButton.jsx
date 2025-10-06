import React, { useState } from "react"; 

function RadioButton() { 
	const [ 
		selectedValue, 
		setSelectedValue, 
	] = useState("option1"); 

	const handleRadioChange = ( 
		value 
	) => { 
		setSelectedValue(value); 
	}; 

	const styles = { 
		container: { 
			display: "flex", 
			flex: 1, 
			justifyContent: "center", 
			alignItems: "center", 
		},  
		radioGroup: { 
			display: "flex", 
			flexDirection: "row", 
			alignItems: "center", 
			justifyContent: 
				"space-around", 
			marginTop: "10px", 
			borderRadius: "8px", 
			backgroundColor: "white", 
			padding: "17px", 
			boxShadow: 
				"0px 2px 3.84px rgba(0, 0, 0, 0.25)", 
		}, 
		radioButton: { 
			display: "flex", 
			flexDirection: "row", 
			alignItems: "center", 
		}, 
		radioLabel: { 
			marginLeft: "5px", 
            marginRight: "5px",
			fontSize: "15px", 
			color: "#333", 
		}, 
	}; 

	return ( 
		<div> 
			<div 
				style={styles.container} 
			> 
				<div 
					style={ 
						styles.radioGroup 
					} 
				> 
					<div 
						style={ 
							styles.radioButton 
						} 
					> 
						<input 
							type="radio"
							id="Freelancer"
							value="Freelancer"
							checked={ 
								selectedValue === 
								"Freelancer"
							} 
							onChange={() => 
								handleRadioChange( 
									"Freelancer"
								) 
							} 
						/> 
						<label 
							htmlFor="Freelancer"
							style={ 
								styles.radioLabel 
							} 
						> 
							Freelancer 
						</label> 
					</div> 

					<div 
						style={ 
							styles.radioButton 
						} 
					> 
						<input 
							type="radio"
							id="Client"
							value="Client"
							checked={ 
								selectedValue === 
								"Client"
							} 
							onChange={() => 
								handleRadioChange( 
									"Client"
								) 
							} 
						/> 
						<label 
							htmlFor="Client"
							style={ 
								styles.radioLabel 
							} 
						> 
							Client 
						</label> 
					</div> 

					<div 
						style={ 
							styles.radioButton 
						} 
					> 
						<input 
							type="radio"
							id="Trainer"
							value="Trainer"
							checked={ 
								selectedValue === 
								"Trainer"
							} 
							onChange={() => 
								handleRadioChange( 
									"Trainer"
								) 
							} 
						/> 
						<label 
							htmlFor="Trainer"
							style={ 
								styles.radioLabel 
							} 
						> 
							Trainer 
						</label> 
					</div> 
				</div> 
			</div> 
		</div> 
	); 
} 

export default RadioButton; 
