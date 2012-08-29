package com.brisco.PBN.Mapping;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;

import com.brisco.Game.Bid;
import com.brisco.Game.BidQuality;
import com.brisco.Game.Suit;

public class BidMapperTest {

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public final void test3NTmapsTo3NT() {
		Bid b = new Bid();
		b.Level = 3;
		b.Suit = Suit.Notrump;

		Assert.assertEquals("3NT", BidMapper.GetStringFromBid(b));
	}

	@Test
	public final void test3NTVeryPoormapsTo3NT() {
		Bid b = new Bid();
		b.Level = 3;
		b.Suit = Suit.Notrump;
		b.Quality = BidQuality.VeryPoor;

		Assert.assertEquals("3NT $4", BidMapper.GetStringFromBid(b));
	}

	@Test
	public final void test4HwithcommentsVeryGoodMapsTo4Hcorrectly() {
		Bid b = new Bid();
		b.Level = 4;
		b.Suit = Suit.Hearts;
		b.Quality = BidQuality.VeryGood;
		b.Explanation = 5;

		Assert.assertEquals("4H =5= $3", BidMapper.GetStringFromBid(b));
	}

	@Test
	public final void test2SwithcommentsMapsTo2Scorrectly() {
		Bid b = new Bid();
		b.Level = 2;
		b.Suit = Suit.Spades;
		b.Explanation = 2;

		Assert.assertEquals("2S =2=", BidMapper.GetStringFromBid(b));
	}

	@Test
	public final void testPassMapsToPass() {
		Bid b = new Bid();
		b.Pass = true;

		Assert.assertEquals("Pass", BidMapper.GetStringFromBid(b));
	}

	@Test
	public final void testRedoubleSpeculativeMapsToXXCorrectly() {
		Bid b = new Bid();
		b.ReDouble = true;
		b.Quality = BidQuality.Speculative;

		Assert.assertEquals("XX $5", BidMapper.GetStringFromBid(b));
	}

	@Test
	public final void testDoubleMapsToX() {
		Bid b = new Bid();
		b.Double = true;

		Assert.assertEquals("X", BidMapper.GetStringFromBid(b));
	}
}
