package org.ani.zation.service;

import java.io.Serializable;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.cronopios.regalator.CanonicalCategory;
import org.cronopios.regalator.GiftRecommendation;

public class RecommendationDTO implements Serializable {
		
		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;
		private String id;
		private String name;
		private String imageURL;
		private boolean userScore;
		
		public RecommendationDTO(GiftRecommendation<CanonicalCategory> r) {
			this.fill(
					r.getGift().getId(), 
					r.getGift().getTitle(), 
					r.getGift().getImageURL());
		}
		
		public RecommendationDTO(JSONObject data) throws JSONException {
			this.fill(
					data.getString("id"),
					data.getString("name"),
					data.getString("imageURL"));
			this.setUserScore(data.getBoolean("userScore"));
		}
		
		private void fill(String id, String name, String imageURL) {
			this.setId(id);
			this.setName(name);
			this.setImageURL(imageURL);
		}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getImageURL() {
			return imageURL;
		}

		public void setImageURL(String imageURL) {
			this.imageURL = imageURL;
		}

		public boolean getUserScore() {
			return userScore;
		}

		public void setUserScore(boolean userScore) {
			this.userScore = userScore;
		}

	}
