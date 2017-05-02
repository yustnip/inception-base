<?php get_header(); ?>

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <?php the_content(); ?>
            <?php endwhile; else : ?>
            <div bemClass="b( 'loop-error' )">
                <p bemClass="b( 'loop-error' )( 'message' ).mix( 'example' )">
                    <?php _e('Sorry, no posts matched your criteria.'); ?>
                </p>
            </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>
