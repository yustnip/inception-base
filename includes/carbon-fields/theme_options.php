<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

$basic_options_container = Container::make( 'theme_options', 'Content' )
  ->add_fields( array(
    Field::make( 'separator', 'crb_separator_common', 'Common info' ),
    Field::make( 'text', 'crb_phone', 'Phone number' ),
  ) );

Container::make( 'theme_options', 'Offices' )
  ->set_page_parent( $basic_options_container )
  ->add_fields( array(
    Field::make( 'complex', 'crb_offices' , 'Offices' )
      ->add_fields( array(
        Field::make( 'text', 'crb_address', 'Address' ),
    ) ),
  ) );
