package org.ani.zation.recommender;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.ani.zation.service.RecommendationDTO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.cronopios.regalator.CanonicalCategory;
import org.cronopios.regalator.GiftRecommendation;
import org.cronopios.regalator.GiftRecommender;

import com.google.common.collect.Lists;

public class GifterSession {

	private final GiftRecommender<CanonicalCategory> recommender;
	protected static final Log log = LogFactory.getLog(GifterSession.class);
	int nRecommendations = 3;

	private Set<GiftRecommendation<CanonicalCategory>> rated = new HashSet<GiftRecommendation<CanonicalCategory>>();
	private List<GiftRecommendation<CanonicalCategory>> toRate = new ArrayList<GiftRecommendation<CanonicalCategory>>();

	public GifterSession(GiftRecommender<CanonicalCategory> recommender) {
		this.recommender = recommender;
	}

	public Set<GiftRecommendation<CanonicalCategory>> recommend(Map<String, RecommendationDTO> news) {

		if (!news.isEmpty()) {
			for (GiftRecommendation<CanonicalCategory> pending : toRate) {
				boolean score = news.get(pending.getGift().getId()).getUserScore();
				pending.setUserScore(score ? 1D : 0D);
			}
			rated.addAll(toRate);
			toRate.clear();
		} else {
			System.out.println("news is empty");
		}

		Set<GiftRecommendation<CanonicalCategory>> recommend = this.recommender.recommend(rated, nRecommendations);
		this.toRate = Lists.newArrayList(recommend);
		return recommend;
	}

}
