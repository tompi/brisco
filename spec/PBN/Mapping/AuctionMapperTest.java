package com.brisco.PBN.Mapping;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;

import com.brisco.Game.Bid;
import com.brisco.Game.Direction;
import com.brisco.Game.Suit;
import com.brisco.PBN.Game.Auction;

public class AuctionMapperTest {
	Auction _auction;

	@Before
	public void setUp() throws Exception {
		_auction = new Auction();
		_auction.Auction = new com.brisco.Game.Auction(Direction.North);
		Bid b = new Bid();
		b.Pass = true;
		_auction.Auction.Bids.add(b);
		b = new Bid();
		b.Level = 2;
		b.Suit = Suit.Hearts;
		b.Explanation = 1;
		_auction.Auction.Bids.add(b);
		b = new Bid();
		b.Pass = true;
		_auction.Auction.Bids.add(b);
		b = new Bid();
		b.Level = 2;
		b.Suit = Suit.Notrump;
		b.Explanation = 2;
		_auction.Auction.Bids.add(b);
		b = new Bid();
		b.Pass = true;
		_auction.Auction.Bids.add(b);
		b = new Bid();
		b.Level = 3;
		b.Suit = Suit.Diamonds;
		b.Explanation = 3;
		_auction.Auction.Bids.add(b);
		b = new Bid();
		b.Pass = true;
		_auction.Auction.Bids.add(b);
		b = new Bid();
		b.Level = 4;
		b.Suit = Suit.Hearts;
		_auction.Auction.Bids.add(b);
		b = new Bid();
		b.Pass = true;
		_auction.Auction.Bids.add(b);
		b = new Bid();
		b.Pass = true;
		_auction.Auction.Bids.add(b);
		b = new Bid();
		b.Pass = true;
		_auction.Auction.Bids.add(b);
		_auction.Auction.Explanations.add("Weak");
		_auction.Auction.Explanations.add("Asking");
		_auction.Auction.Explanations.add("Strong with diamonds");
	}

	@Test
	public final void testAuctionMapping() {
		StringBuilder sb = new StringBuilder();
		AuctionMapper.AppendAuction(sb, _auction);
		String result = sb.toString();

		Assert.assertEquals("[Auction \"N\"]\n" + "Pass 2H =1= Pass 2NT =2=\n"
				+ "Pass 3D =3= Pass 4H\n" + "Pass Pass Pass\n"
				+ "[Note \"1:Weak\"]\n" + "[Note \"2:Asking\"]\n"
				+ "[Note \"3:Strong with diamonds\"]\n", result);
	}

}
