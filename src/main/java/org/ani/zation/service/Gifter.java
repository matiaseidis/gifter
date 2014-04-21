package org.ani.zation.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;

import javax.servlet.ServletContext;
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

	@javax.ws.rs.core.Context
	ServletContext context;

	@POST
	@Path("/recommendation")
	@Produces(MediaType.APPLICATION_JSON)
	public Response reportScore(JSONObject input, @Context HttpServletRequest httpRequest) {

		System.out.println("SCORE: " + input.toString());

		Map<String, RecommendationDTO> userScore = new HashMap<String, RecommendationDTO>();
		List<String> filters = new ArrayList<String>();
		
		try {
			JSONArray scores = input.getJSONArray("scores");
			System.out.println(scores.length());
			if (scores.length() > 0) {
				for (int i = 0; i < scores.length(); i++) {
					JSONObject score = scores.getJSONObject(i);
					RecommendationDTO recommendationDTO = new RecommendationDTO(score);
					userScore.put(recommendationDTO.getId(), recommendationDTO);
				}
			}
			JSONArray jFilters = input.getJSONArray("filters");
			if (jFilters.length() > 0) {
				for (int i = 0; i < jFilters.length(); i++) {
					String filter = jFilters.getString(i);
					filters.add(filter);
				}
			}
		} catch (JSONException e) {
			return Response.status(400).entity("Invalid input").build();
		}

		HttpSession session = httpRequest.getSession(true);
		GifterSession gs = (GifterSession) session.getAttribute("gifter");
		final GiftItemSearchingService giftItemSearchingService = (GiftItemSearchingService) session.getServletContext().getAttribute("searchingService");
		Set<GiftRecommendation<CanonicalCategory>> recommended = gs.recommend(userScore, filters);
		List<RecommendationDTO> resp = new ArrayList<RecommendationDTO>();

		ExecutorService execPool = (ExecutorService) context.getAttribute("execPool");

		List<Future<RecommendationDTO>> promises = new ArrayList<Future<RecommendationDTO>>();

		for (final GiftRecommendation<CanonicalCategory> r : recommended) {

			final RecommendationDTO e = new RecommendationDTO(r);

			Future<RecommendationDTO> incomingRecommendation = execPool.submit(new Callable<RecommendationDTO>() {

				@Override
				public RecommendationDTO call() throws Exception {
					List<? extends GiftItem> searchResult = giftItemSearchingService.search(r.getGift());
					for (GiftItem giftItem : searchResult) {
						e.getItems().add(new GiftItemDTO(giftItem.getTitle(), giftItem.getImages(), giftItem.getExternalURL()));
					}
					return e;
				}

			});

			promises.add(incomingRecommendation);

		}

		for (Future<RecommendationDTO> fr : promises) {
			try {
				resp.add(fr.get());
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (ExecutionException e) {
				e.printStackTrace();
			}
		}

		return Response.status(200).entity(resp).build();
	}
}