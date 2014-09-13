using FoursquareAngularJS.Data.Entities;
using FoursquareAngularJS.Data.Mappers;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoursquareAngularJS.Data
{
    /// <summary>
    /// Transfer every POCO class declared as DbSet properties to the database table.
    /// Apply custom mapping rules for each POCO by adding it in the DBModelBuilder in the overriden OnModelCreating method.
    /// derives from class System.Data.Entity.DbContext
    /// </summary>
    public class FourSquareContext:DbContext
    {
        public FourSquareContext():
            base("FourSquareEntities")
        {
            //Is used in conjugation with lazy loading property, so if it is set to false "FourSquareContext" wont load sub-objects
            // unless Include method is called
            Configuration.ProxyCreationEnabled = false;
            //enables loading of the sub-objects of model up-front. but in our case we want to load them on demand so we set it as false
            Configuration.LazyLoadingEnabled = false;

            Database.SetInitializer(new MigrateDatabaseToLatestVersion<FourSquareContext, FourSquareContextMigrationConfiguration>());
        }

        public DbSet<BookmarkedPlace> BookmarkedPlaces { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new BookmarkedPlaceMapper());

            base.OnModelCreating(modelBuilder);
        }
    }
}
