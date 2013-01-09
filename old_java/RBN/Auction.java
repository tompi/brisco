package com.brisco.RBN;

import com.brisco.Game.Vulnerability;
import com.brisco.RBN.Mapping.AuctionMapper;

public class Auction extends RBNLine {
	public com.brisco.Game.Auction Auction;
	public Vulnerability Vulnerability;

	@Override
	public String GetRBNString() {
		return null;
	}

	@Override
	public void ParseRBNString(String rbn) {
		if (rbn != null && rbn.length() > 0) {
			Auction = AuctionMapper.GetAuctionFromString(rbn);
			Vulnerability = AuctionMapper.GetVulnerabilityFromString(rbn);
		}
	}

	@Override
	public RBNLineType GetRBNLineType() {
		return RBNLineType.Auction;
	}

}
