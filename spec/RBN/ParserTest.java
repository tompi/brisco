package com.brisco.RBN;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;

import com.brisco.Game.BidQuality;
import com.brisco.Game.Contract;
import com.brisco.Game.Direction;
import com.brisco.Game.Suit;
import com.brisco.Game.Vulnerability;

public class ParserTest {
	RBNArticle _article;

	@Before
	public void setUp() throws Exception {
		Parser _parser = new Parser();
		_article = _parser.Parse(this.getClass().getResourceAsStream(
				"Test1.rbn"));
	}

	@Test
	public final void testAuthorIsRichardPavelcek() {
		Assert.assertEquals("Richard Pavlicek", _article.Author);
	}

	@Test
	public final void testContractIs5HXN() {
		Contract contract = null;
		for (RBNLine line : _article.Lines) {
			if (line.GetRBNLineType() == RBNLineType.ContractAndDeclarer) {
				contract = ((ContractAndDeclarer) line).Contract;
			}
		}
		Assert.assertEquals(Direction.North, contract.Player);
		Assert.assertEquals(5, contract.Level);
		Assert.assertEquals(Suit.Hearts, contract.Suit);
		Assert.assertEquals(true, contract.Doubled);
		Assert.assertEquals(false, contract.ReDoubled);
	}

	@Test
	public final void testAuction() {
		com.brisco.Game.Auction auction = null;
		Hands hands = null;
		for (RBNLine line : _article.Lines) {
			if (line.GetRBNLineType() == RBNLineType.Auction) {
				auction = ((Auction) line).Auction;
			} else if (line.GetRBNLineType() == RBNLineType.Hands) {
				hands = (Hands) line;
			}
		}
		Assert.assertEquals(Direction.West, auction.Dealer);
		Assert.assertEquals(Vulnerability.None, hands.Vulnerability);
		Assert.assertEquals(9, auction.Bids.size());
		Assert.assertEquals(true, auction.Bids.get(0).Conventional);
		Assert.assertEquals(BidQuality.Good, auction.Bids.get(1).Quality);
		Assert.assertEquals(1, auction.Bids.get(3).Explanation);
		Assert.assertEquals(Suit.Hearts, auction.Bids.get(7).Suit);
		Assert.assertEquals(BidQuality.VeryPoor, auction.Bids.get(7).Quality);
		Assert.assertEquals(true, auction.Bids.get(8).Double);
		Assert.assertEquals(2, auction.Explanations.size());
	}
}
