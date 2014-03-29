package org.ani.zation.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.ani.zation.recommender.GifterSession;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.cronopios.regalator.CanonicalCategory;
import org.cronopios.regalator.GiftItem;
import org.cronopios.regalator.GiftItemSearchingService;
import org.cronopios.regalator.GiftRecommendation;

@Path("/gifter")
public class Gifter {

	@POST
	@Path("/recommendation")
	@Produces(MediaType.APPLICATION_JSON)
	public Response reportScore(JSONObject input, @Context HttpServletRequest httpRequest) {

		System.out.println("SCORE: " + input.toString());

		Map<String, RecommendationDTO> userScore = new HashMap<String, RecommendationDTO>();
		try {
			JSONArray scores = input.getJSONArray("scores");
			if (scores.length() > 0) {
				for (int i = 0; i < scores.length(); i++) {
					JSONObject score = scores.getJSONObject(i);
					RecommendationDTO recommendationDTO = new RecommendationDTO(score);
					userScore.put(recommendationDTO.getId(), recommendationDTO);
				}
			}
		} catch (JSONException e) {
			return Response.status(400).entity("Invalid input").build();
		}
		HttpSession session = httpRequest.getSession(true);
		GifterSession gs = (GifterSession) session.getAttribute("gifter");
		GiftItemSearchingService giftItemSearchingService = (GiftItemSearchingService) session.getServletContext().getAttribute("searchingService");
		Set<GiftRecommendation<CanonicalCategory>> recommended = gs.recommend(userScore);
		List<RecommendationDTO> resp = new ArrayList<RecommendationDTO>();
		
		for (GiftRecommendation<CanonicalCategory> r : recommended) {
			RecommendationDTO e = new RecommendationDTO(r);
			List<? extends GiftItem> search = giftItemSearchingService.search(r.getGift());
			for (GiftItem giftItem : search) {
				e.getItems().add(new GiftItemDTO(giftItem.getTitle(), giftItem.getImage()));
			}
			resp.add(e);
		}

		return Response.status(200).entity(resp).build();
	}
}