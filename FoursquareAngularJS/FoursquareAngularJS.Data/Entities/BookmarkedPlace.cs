using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoursquareAngularJS.Data.Entities
{
    /// <summary>
    /// Sample of POCO - Plain Old CLR Object
    /// POCO is used in Entity Framwork "Code First Approach" to define the model object(Table fields) in the DB.
    /// as you can notice classes do not derive from any base classes nor have any attributes. havinf this standard classes 
    /// give us more data access felixiblity and allow us to focus on application needs without worrying about persistent implementation.
    /// </summary>
    public class BookmarkedPlace
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string VenueID { get; set; }
        public string VenueName { get; set; }

        public string Address { get; set; }

        public string Category { get; set; }

        public Decimal Rating { get; set; }

        public DateTime? TS { get; set; }

    }
}
