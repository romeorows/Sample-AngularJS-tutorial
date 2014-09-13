using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoursquareAngularJS.Data
{
    /// <summary>
    /// Configures the initialization and migration strategy of the database.
    /// </summary>
    class FourSquareContextMigrationConfiguration :DbMigrationsConfiguration<FourSquareContext>
    {
        public FourSquareContextMigrationConfiguration()
        {
            //this will migrate to the latest version if any changes has been made to the model.
            //this will tell EF to handle the automactic migration for us without caring about DB versioning.
            this.AutomaticMigrationsEnabled = true;
            //this will data loss during migration to the latest version. this is dangerous for the production environment.
            //so should only be used during development process.
            //if it was set to false and exception will be thrown if data loss may occur.
            this.AutomaticMigrationDataLossAllowed = true;
        }
    }
}
