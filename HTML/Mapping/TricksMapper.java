package com.brisco.HTML.Mapping;

import com.brisco.Game.Contract;

public class TricksMapper {
	public static String GetStringFromContract(Contract contract) {
		int diff = contract.Tricks - (contract.Level + 6);
		if (diff == 0) {
			return "=";
		} else if (diff > 0) {
			return "+" + diff;
		} else {
			return Integer.toString(diff);
		}
	}
}
