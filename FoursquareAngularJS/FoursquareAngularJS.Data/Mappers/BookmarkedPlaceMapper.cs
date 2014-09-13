using FoursquareAngularJS.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoursquareAngularJS.Data.Mappers
{
    /// <summary>
    /// "Convention over Configuration" Approach - mapping your POCO classes to database objects(Table,Table fields data types and FK Relations).
    /// In here we will be configuring the POCO class propeties.(Data Type, Null-Ability, PK, identity columns and FK relations)
    /// </summary>
    class BookmarkedPlaceMapper : EntityTypeConfiguration<BookmarkedPlace>
    {
        public BookmarkedPlaceMapper()
        {
            this.ToTable("BookmarkedPlaces", "foursquare");

            this.HasKey(c => c.Id);
            this.Property(c => c.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(c => c.Id).IsRequired();

            this.Property(c => c.UserName).IsRequired();
            this.Property(c => c.UserName).HasMaxLength(50);

            this.Property(c => c.VenueID).IsRequired();
            this.Property(c => c.VenueID).HasMaxLength(50);

            this.Property(c => c.VenueName).IsRequired();
            this.Property(c => c.VenueName).HasMaxLength(100);

            this.Property(c => c.Address).IsOptional();
            this.Property(c => c.Address).HasMaxLength(100);

            this.Property(c => c.Category).IsOptional();
            this.Property(c => c.Category).HasMaxLength(100);

            this.Property(c => c.Rating).IsOptional();

            this.Property(c => c.TS).IsOptional();
            this.Property(c => c.TS).HasColumnType("smalldatetime");
        }
    }
}
