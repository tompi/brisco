package com.brisco.RBN.Mapping;

import com.brisco.Game.Contract;
import com.brisco.Game.Suit;
import com.brisco.PBN.Mapping.DirectionMapper;
import com.brisco.PBN.Mapping.SuitMapper;

public class ContractMapper {

	public static Contract GetContractFromString(String contract) {
		if (contract == null || contract.length() < 1) {
			return null;
		}
		Contract ret = new Contract();
		if (contract == "Pass") {
			ret.Level = 0;
			return ret;
		}
		ret.Level = Integer.parseInt(contract.substring(0, 1));
		if (contract.charAt(1) == 'N') {
			ret.Suit = Suit.Notrump;
		} else {
			ret.Suit = SuitMapper.GetSuitFromString(contract.substring(1, 2));
		}
		ret.ReDoubled = contract.contains("R");
		if (ret.ReDoubled) {
			ret.Doubled = true;
		} else {
			ret.Doubled = contract.contains("X");
		}
		int ix = contract.lastIndexOf(':');
		if (ix > 0) {
			ret.Player = DirectionMapper.GetDirectionFromString(contract
					.charAt(ix + 1));
		}

		return ret;
	}

	public static String GetStringFromContract(Contract contract) {
		if (contract.Level == 0) {
			return "Pass";
		}
		StringBuffer ret = new StringBuffer();
		ret.append(contract.Level);
		ret.append(SuitMapper.GetStringFromSuit(contract.Suit));
		if (contract.ReDoubled) {
			ret.append("R");
		} else if (contract.Doubled) {
			ret.append("X");
		}
		ret.append(DirectionMapper.GetStringFromDirection(contract.Player));
		return ret.toString();
	}

}
