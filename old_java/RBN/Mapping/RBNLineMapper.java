package com.brisco.RBN.Mapping;

import com.brisco.RBN.Auction;
import com.brisco.RBN.BidExplanation;
import com.brisco.RBN.ContractAndDeclarer;
import com.brisco.RBN.Hands;
import com.brisco.RBN.Pause;
import com.brisco.RBN.RBNLine;
import com.brisco.RBN.RBNLineType;
import com.brisco.RBN.Text;
import com.brisco.RBN.TitleAndAuthor;

public class RBNLineMapper {
	public static RBNLine GetRBNLine(String rbn) {
		if (rbn == null || rbn.length() < 2) {
			return null;
		}
		char firstChar = rbn.charAt(0);
		String value = rbn.substring(2);
		RBNLineType type = RBNLineTypeMapper.GetRBNLineType(firstChar);
		RBNLine rbnLine = null;

		switch (type) {
		case TitleAndAuthor:
			rbnLine = new TitleAndAuthor();
			break;
		case Hands:
			rbnLine = new Hands();
			break;
		case Text:
			value = rbn;
			rbnLine = new Text();
			break;
		case Pause:
			rbnLine = new Pause();
			break;
		case ContractAndDeclarer:
			rbnLine = new ContractAndDeclarer();
			break;
		case Auction:
			rbnLine = new Auction();
			break;
		case BidExplanation:
			rbnLine = new BidExplanation();
			break;
		case DateAndTime:
		case Location:
		case EventOrMainHeading:
		case SessionStageOrSubheading:
		case FormOfScoring:
		case TeamNamesAndCarryovers:
		case NamesOfPlayersAndRoomOrTable:
		case BoardNumber:
		case PlaySequence:
		case ResultTricksWonAndScore:
		case InstantAwards:
		case MakesAtDoubleDummy:
			// TODO
		}
		if (rbnLine != null) {
			rbnLine.ParseRBNString(value);
		}
		return rbnLine;
	}

}
