import { parseId, route } from "@/lib/auth/api";
import { db } from "@/lib/db";

/**
 * Deletes a booking. Users can delete their own; admins can delete any.
 */
export default route(
	{
		DELETE: async (req, res, { user }) => {
			const id = parseId(req.query.booking_id);
			const booking = id && (await db.bookings.find(id));
			if (!booking || (booking.user_id !== user.user_id && !user.admin)) {
				return res.status(404).json({ error: "Booking not found." });
			}

			await db.bookings.delete(booking.booking_id);
			return res.status(200).json({ message: "Booking deleted successfully" });
		},
	},
	"user",
);
